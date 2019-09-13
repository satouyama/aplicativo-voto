import { environment } from 'src/environments/environment';

export class GenericUtil{


    public assets(url){
        return `${environment.url}/${url}`
    }

    public uploads(url){
        return `${environment.url}/upload/${url}`
    }

}