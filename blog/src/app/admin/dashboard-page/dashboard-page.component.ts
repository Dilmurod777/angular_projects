import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from 'src/app/shared/posts.service';
import { Post } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchStr: string = '';

  constructor(
    private postsService: PostsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.pSub = this.postsService.getAll().subscribe((posts) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }

  removePost(id) {
    this.dSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id != id);
      this.alertService.danger('Post deleted');
    });
  }
}
