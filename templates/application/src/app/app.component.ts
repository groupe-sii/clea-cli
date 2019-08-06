class AppController {
  title: String;

  $onInit () {
    this.title = 'app';
  }

}

export const AppComponent = {
  controller: AppController,
  template: require('./app.component.html')
};
