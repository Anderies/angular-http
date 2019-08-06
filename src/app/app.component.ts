import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//the map operators allow us get some data and automatically re wrap into observable
import { map } from 'rxjs/operators';

import { Post } from './post.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
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

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  //GET DATA FROM FIREBASE
  private fetchPosts(){
    this.http
    // what data you will getting back it's key: string with Post Model
    .get<{[key: string]: Post }>('https://ng-complete-guide-d628c.firebaseio.com/posts.json')
    .pipe(
      map(responseData => {
      const postArray: Post[] = [];
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
        postArray.push({...responseData[key], id: key})
        }
      }
      return postArray;
    }))
    .subscribe(posts => {
      //Transforming Javascript to 
      console.log(posts);
      this.loadedPosts = posts;
    });
  }
}
