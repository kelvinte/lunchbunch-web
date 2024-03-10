export class AppSettings {
  public static HOST = 'http://localhost:8080';
  public static LOGIN_ENDPOINT = AppSettings.HOST + '/login';
  public static REGISTER_ENDPOINT = AppSettings.HOST + '/register';
  public static LUNCH_PLAN_ENDPOINT = AppSettings.HOST + '/lunch-plan';

  public static LUNCH_PLAN_WS_ENDPOINT =
    'ws://localhost:8080/lunch-plan-websock';
}
