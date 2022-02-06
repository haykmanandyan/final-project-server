import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppComponent} from "../../app.component";
import {TodosComponent} from "./components/todos/todos.component";
import {PostsComponent} from "./components/posts/posts.component";
import {UsersComponent} from "./components/users/users.component";
import {DashboardComponent} from "./dashboard.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommentsComponent} from "./components/comments/comments.component";
import {HighlightPipe} from "../../common/pipes/highlight.pipe";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {httpInterceptorProviders} from "../../common/interceptors";
import {AddTodoComponent} from "./components/todos/add-todo/add-todo.component";
import {TodoInfoComponent} from "./components/todos/todo-info/todo-info.component";
import {UserInfoComponent} from "./components/users/user-info/user-info.component";
import {PostInfoComponent} from "./components/posts/post-info/post-info.component";
import {EditUserComponent} from "./components/users/edit-user/edit-user.component";
import {EditPostComponent} from "./components/posts/edit-post/edit-post.component";
import {CapitalizeFirstLetterPipe, SearchPipe} from "../../common/pipes";
import {TodosListComponent} from "./components/todos/todos-list/todos-list.component";
import {PostsListComponent} from "./components/posts/posts-list/posts-list.component";
import {UsersListComponent} from "./components/users/users-list/users-list.component";
import {AddCommentComponent} from "./components/comments/add-comment/add-comment.component";
import {CommentInfoComponent} from "./components/comments/comment-info/comment-info.component";
import {CommentsListComponent} from "./components/comments/comments-list/comments-list.component";
import {Components} from "./components/components";

@NgModule({
  declarations: [
    DashboardComponent,
    CapitalizeFirstLetterPipe,
    AppComponent,
    UsersComponent,
    UsersListComponent,
    UserInfoComponent,
    EditUserComponent,
    PostsListComponent,
    PostInfoComponent,
    EditPostComponent,
    CommentsListComponent,
    CommentInfoComponent,
    AddCommentComponent,
    TodosListComponent,
    PostsComponent,
    CommentsComponent,
    TodosComponent,
    TodoInfoComponent,
    AddTodoComponent,
    SearchPipe,
    HighlightPipe,
  ],
  providers: httpInterceptorProviders,
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CapitalizeFirstLetterPipe,
  ],
})
export class DashboardModule {
}
