export class Url {
    private static value="http://localhost:8080";
    //private static value="http://192.168.1.8:8080"

    public static getUrl():string{
        return Url.value
    }
}
