import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { min } from 'rxjs';
import { questions } from './questions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  team: string | null = null;
  post: string | null = null;
  question: string = '';
  coordinaat: string = '';
  answer: string = '';
  correctAnswer: string = '';
  hint: string = '';
  isValid: boolean = false;
  answerSubmitted: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.team = params['team'];
      this.post = params['post'];
      this.getQuestion();
    });
  }

  private getQuestion() {
    let myarray: any = [];
    questions.forEach((question) => {
      myarray.push(
        `https://jotajoti2022.web.app/?team=${question.team}&post=${question.post}`
      );
      if (question.team === this.team && question.post === this.post) {
        this.question = question.question;
        this.correctAnswer = question.answer;
        this.hint = question.hint;
        this.coordinaat = question.coordinaat;
      }
    });
    console.log(myarray);
  }

  public validateAnswer() {
    if (this.answer.toLowerCase().includes(this.correctAnswer)) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
    this.answerSubmitted = true;
  }
}
