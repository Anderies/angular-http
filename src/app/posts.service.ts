import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class PostsService {

    constructor(private http: HttpClient){

    }
    createAndStorePost(title: string, content: string) {
        //post data we will sending
        const postData: Post = {title: title,content: content};
        // Send Http request
        this.http
            .post<{ name: string }>(
                'https://ng-complete-guide-d628c.firebaseio.com/posts.json',
                postData
            )
            // only send when you subscribe
            .subscribe(responseData => {
                console.log(responseData);
            });
    }

    fetchPosts() {
        return this.http
        // what data you will getting back it's key: string with Post Model
        .get<{[key: string]: Post }>('https://ng-complete-guide-d628c.firebaseio.com/posts.json')
        .pipe(
          map(responseData => {
          const postArray: Post[] = [];
          for(const key in responseData){
            if(responseData.hasOwnProperty(key)){
            postArray.push({...responseData[key], id: key});
            }
          }
          return postArray;
        }));
    }
}