export class ApplicationConstants {
  public static defaultString = '';
  public static defaultStatus = 'active';
  public static defaultBoolean = false;
  public static defaultNumber = 0;
  public static defaultId = 0;
  public static defaultDate = new Date();
  public static defaultByteArray = '';
  public static regexTelephonePattern = '[0-9]{3}-[0-9]{3}-[0-9]{4}';
  public static emptyMessage = '';
  public static emptyId = '';
  public static emptyValue = '';
  public static emptySearchValue = '';
  public static noDataMessage = '(no data)';
  public static savedMessage = 'Saved';
  static defaultNumberOfResults: number = 100;
  static sortDirectionAscending: string = 'ascending';
  static sortDirectionDescending: string = 'descending';
}
