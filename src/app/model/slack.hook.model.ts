export class SlackHook {
  private text: string;
  private username: string;
  private channel: string;

  constructor(text,
              username = "YOP",
              channel = "#looking_back_2016",) {
    this.text = JSON.stringify(text)
  }
}
