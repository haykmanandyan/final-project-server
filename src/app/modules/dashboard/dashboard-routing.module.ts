import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {UsersComponent} from "./components/users/users.component";
import {PostsComponent} from "./components/posts/posts.component";
import {TodosComponent} from "./components/todos/todos.component";
import {CommentsComponent} from "./components/comments/comments.component";
import {DashboardGuard, LeavePageGuard} from "../../common/guards";
import {AddTodoComponent} from "./components/todos/add-todo/add-todo.component";
import {UserInfoComponent} from "./components/users/user-info/user-info.component";
import {PostInfoComponent} from "./components/posts/post-info/post-info.component";
import {EditUserComponent} from "./components/users/edit-user/edit-user.component";
import {EditPostComponent} from "./components/posts/edit-post/edit-post.component";
import {TodoInfoComponent} from "./components/todos/todo-info/todo-info.component";
import {TodosListComponent} from "./components/todos/todos-list/todos-list.component";
import {UsersListComponent} from "./components/users/users-list/users-list.component";
import {PostsListComponent} from "./components/posts/posts-list/posts-list.component";
import {AddCommentComponent} from "./components/comments/add-comment/add-comment.component";
import {CommentInfoComponent} from "./components/comments/comment-info/comment-info.component";
import {CommentsListComponent} from "./components/comments/comments-list/comments-list.component";


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [DashboardGuard],
    children: [
      {path: '', redirectTo: 'users', pathMatch: 'full'},

      {
        path: 'users', component: UsersComponent,
        children: [
          {path: '', redirectTo: 'users-list', pathMatch: 'prefix'},
          {path: 'users-list', component: UsersListComponent},
          {path: ':id/user-info', component: UserInfoComponent},
          {path: ':id/edit-user', component: EditUserComponent, canDeactivate: [LeavePageGuard]},
          {path: 'add-new-user', component: EditUserComponent, canDeactivate: [LeavePageGuard]},
        ]
      },

      {
        path: 'posts', component: PostsComponent,
        children: [
          {path: '', redirectTo: 'posts-list', pathMatch: 'prefix'},
          {path: 'posts-list', component: PostsListComponent},
          {path: ':id/post-info', component: PostInfoComponent},
          {path: ':id/edit-post', component: EditPostComponent, canDeactivate: [LeavePageGuard]},
          {path: 'add-new-post', component: EditPostComponent, canDeactivate: [LeavePageGuard]},
        ]
      },

      {
        path: 'comments', component: CommentsComponent,
        children: [
          {path: '', redirectTo: 'comments-list', pathMatch: 'prefix'},
          {path: 'comments-list', component: CommentsListComponent},
          {path: ':id/comment-info', component: CommentInfoComponent},
          {path: 'add-new-comment', component: AddCommentComponent, canDeactivate: [LeavePageGuard]},
        ]
      },

      {
        path: 'todos', component: TodosComponent,
        children: [
          {path: '', redirectTo: 'todos-list', pathMatch: 'prefix'},
          {path: 'todos-list', component: TodosListComponent},
          {path: ':id/todo-info', component: TodoInfoComponent},
          {path: 'add-new-todo', component: AddTodoComponent, canDeactivate: [LeavePageGuard]},
        ]
      },
    ]
  },
  {path: '**', redirectTo: 'dashboard'}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
