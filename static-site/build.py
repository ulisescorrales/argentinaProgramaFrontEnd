"""Generate plain HTML from the saved portfolio data; no dependencies or server."""
import html
import json
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent
data = json.loads((ROOT / 'data.json').read_text())
icons = json.loads((ROOT / 'icons.json').read_text())
cache = json.loads((ROOT / 'asset-map.json').read_text()) if (ROOT / 'asset-map.json').exists() else {}

def esc(value):
    return html.escape(str(value or ''), quote=True)

def url(value):
    value = str(value or '')
    if urlsplit(value).scheme not in ('', 'https', 'http', 'mailto') or value.startswith('//'):
        return ''
    return esc(cache.get(value, value.lstrip('/') if value.startswith('/assets/') else value))

def image(src, alt, cls=''):
    return f'<img src="{url(src)}" alt="{esc(alt)}" class="{cls}" loading="lazy">'

def link(href, text, cls=''):
    return f'<a href="{url(href)}" class="{cls}" target="_blank" rel="noopener noreferrer">{esc(text)}</a>'

def section(name, title, content):
    return f'<section id="{name}" class="container portfolio-section"><h2 class="section-title">{title}</h2>{content}</section>'

p, c, dom = data['persona'], data['contacto'], data['domicilio']
email = 'mailto:' + c['email']
social = ''.join(f'<a href="{url(c[n])}" aria-label="{n.title()}" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 16 16" aria-hidden="true">{icons[n]}</svg></a>' for n in icons if c.get(n))
social += f'<a href="{url(email)}" aria-label="Contacto por correo"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="1" stroke="currentColor"/><path d="m2 4 10 8L22 4M2 20l7-7m13 7-7-7" stroke="currentColor"/></svg></a>'
body = f'''<header class="site-header"><nav aria-label="Redes y preferencias"><div class="social">{social}</div>
<label class="theme-control form-check form-switch"><input id="theme" type="checkbox" role="switch" class="form-check-input" aria-label="Tema oscuro"><span aria-hidden="true">◐</span></label></nav></header>
<main><section id="acercaDe" class="container"><img class="banner" src="{url(p['fotoFondo'])}" alt="Banner">
<div class="profile"><div class="identity"><img class="portrait" src="{url(p['fotoPerfil'])}" alt="Foto de {esc(p['nombre'])}"><h1>{esc(p['apellido'])} {esc(p['nombre'])}</h1></div><p>{esc(p['sobreMi'])}</p></div></section>'''

rows = []
for exp in data['experiencia']:
    tasks = ''.join(f'<li>{esc(t["descripcion"])} {link(t["repositorio"], "Repositorio") if t.get("repositorio") else ""}</li>' for t in exp.get('tareas', []))
    end = f'<p>Fin: {esc(exp["fin"])}</p>' if exp.get('fin') else ''
    rows.append(f'<article class="entry">{image(exp["logo"], exp["organizacion"], "entry-logo")}<div><h3>{esc(exp["titulo"])}</h3><p>Institución: {esc(exp["organizacion"])}</p><p>Inicio: {esc(exp["inicio"])}</p>{end}<p>{esc(exp["descripcion"])}</p>{"<ul>"+tasks+"</ul>" if tasks else ""}</div></article>')
body += section('experiencia', 'Experiencia', ''.join(rows))

rows = []
for edu in data['educacion']:
    state = 'Estado: ' + edu['estado']
    state = link(edu['certificado'], state) if edu.get('certificado') else esc(state)
    start = f'<p>Comienzo: {esc(edu["anioIngreso"])}</p>' if edu.get('anioIngreso') else ''
    end = f'<p>Finalización: {esc(edu["anioFinalizacion"])}</p>' if edu['materiasAprobadas'] == edu['materiasTotales'] and edu.get('anioFinalizacion') else ''
    rows.append(f'<article class="entry">{image(edu["logo"], edu["institucion"], "entry-logo")}<div><h3>{esc(edu["titulo"])}</h3><p>Institución: {esc(edu["institucion"])}</p><p>{state}</p>{start}{end}</div></article>')
body += section('educacion', 'Educación', ''.join(rows))
body += section('conocimientos', 'Conocimientos', '<div class="knowledge-grid">' + ''.join(f'<div class="technology">{image(t["logo"], t["nombre"])}</div>' for t in data['tecnologia']) + '</div>')

cards = []
for proj in data['proyecto']:
    tasks = ''.join(f'<li>{esc(t["descripcion"])} {link(t["certificado"], "Ver enlace") if t.get("certificado") else ""} {link(t["repositorio"], "Repositorio") if t.get("repositorio") else ""}</li>' for t in proj.get('tareas', []))
    links = ''.join(f'<li>{link(proj[k], label)}</li>' for k, label in [('link','FrontEnd'),('github','Repositorio'),('githubFrontEnd','Repositorio FrontEnd'),('githubBackEnd','Repositorio BackEnd')] if proj.get(k))
    cards.append(f'<article class="project">{image(proj["logo"], proj["nombre"], "project-logo")}<div class="project-body"><h3>{esc(proj["nombre"])}</h3><p>{esc(proj["descripcion"])}</p>{"<ul>"+tasks+"</ul>" if tasks else ""}<ul class="project-links">{links}</ul></div></article>')
body += section('proyectos','Proyectos','<div class="project-grid">'+''.join(cards)+'</div>')
body += f'</main><footer><div class="container"><p>{esc(", ".join(dom[k] for k in ["ciudad","provincia","pais"]))}</p><a class="btn btn-light" href="{url(email)}">Contacto</a></div></footer>'

page = f'''<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(p['apellido'])} {esc(p['nombre'])} - Portfolio</title><meta name="description" content="{esc(p['sobreMi'])}">
<link rel="stylesheet" href="assets/vendor/bootstrap.min.css"><link rel="stylesheet" href="styles.css"><script src="script.js" defer></script>
</head><body>{body}</body></html>'''
(ROOT / 'index.html').write_text(page, encoding='utf-8')
print('Generated', ROOT / 'index.html')
