import {Component, OnInit} from "@angular/core";
import {Post} from "../../../model/post.model";
import {PostService} from "../../../service/post.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../service/auth.service";
import {User} from "../../../model/user.model";


declare const $: any;
declare const Chart: any;

@Component({
  selector: 'post-component',
  providers: [PostService],
  templateUrl: 'post.list.component.html'
})


export class PostListComponent implements OnInit {
  posts: Post[];
  user: User;
  isLogin: boolean = false;
  isLiked: Boolean;

  constructor(private postService: PostService,
              private authService: AuthService,
              private activatedRouter: ActivatedRoute) {
  }

  ngOnInit() {
    $(() => {
      Chart.pluginService.register({
        afterUpdate: (chart) => {
          if (chart.config.options.elements.center) {
            let helpers = Chart.helpers;
            let centerConfig = chart.config.options.elements.center;
            let globalConfig = Chart.defaults.global;
            let ctx = chart.chart.ctx;

            let fontStyle = helpers.getValueOrDefault(centerConfig.fontStyle, globalConfig.defaultFontStyle);
            let fontFamily = helpers.getValueOrDefault(centerConfig.fontFamily, globalConfig.defaultFontFamily);
            let fontSize;

            if (centerConfig.fontSize) {
              fontSize = centerConfig.fontSize;
            } else {
              ctx.save();
              let fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);
              let maxFontSize = helpers.getValueOrDefault(centerConfig.maxFontSize, 256);
              let maxText = helpers.getValueOrDefault(centerConfig.maxText, centerConfig.text);

              do {
                ctx.font = helpers.fontString(fontSize, fontStyle, fontFamily);
                let textWidth = ctx.measureText(maxText).width;

                // check if it fits, is within configured limits and that we are not simply toggling back and forth
                if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize)
                  fontSize += 1;
                else {
                  // reverse last step
                  fontSize -= 1;
                  break;
                }
              } while (true);
              ctx.restore();
            }

            // save properties
            chart.center = {
              font: helpers.fontString(fontSize, fontStyle, fontFamily),
              fillStyle: helpers.getValueOrDefault(centerConfig.fontColor, globalConfig.defaultFontColor)
            };
          }
        },
        afterDraw: function (chart) {
          if (chart.center) {
            let centerConfig = chart.config.options.elements.center;
            let ctx = chart.chart.ctx;

            ctx.save();
            ctx.font = chart.center.font;
            ctx.fillStyle = chart.center.fillStyle;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            let centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
            let centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
            ctx.fillText(centerConfig.text, centerX, centerY);
            ctx.restore();
          }
        },
      });

      $.getJSON("../data/chart-data.json", data => {
        const ctx = document.getElementById("myChart");
        const myDoughnutChart = new Chart(ctx, {
          type: 'doughnut',
          data,
          options: {
            elements: {
              center: {
                // the longest text that could appear in the center
                maxText: '100%',
                text: 'language',
                fontColor: '#000000',
                fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                fontStyle: 'normal',
                // fontSize: 12,
                // if a fontSize is NOT specified, we will scale (within the below limits) maxText to take up the maximum space in the center
                // if these are not specified either, we default to 1 and 256
                minFontSize: 1,
                maxFontSize: 18,
              }
            }
          }
        })
      });

      $(".button-collapse").sideNav();

      $.getJSON("../data/nouns.json", words => {
        $("#cloud").jQCloud(words, {
          autoResize: true,
          shape: 'rectangular'
        });
      })

    });
    this.activatedRouter.params
      .map(params => params['key'])
      .switchMap(key => this.postService.getPosts())
      .subscribe(posts => {
        this.posts = posts;
      });

    this.authService.getSession()
      .take(1)
      .subscribe(session => {
        if (session) {
          this.user = session.auth;
          this.isLogin = true;
        }

        // this.postService.isLiked(this.postKey, this.user).subscribe(isLiked => {
        //   this.isLiked = isLiked.$value
        // });
      });
  }

  onLikeBtnClick(postKey) {
    if (this.isLogin) {
      this.postService.toggleLike(postKey, this.user).then((data) =>{
        console.log(data)
      });
    } else {
      alert("로그인이 필요한 기능입니다.");
    }
  }
}
