import { Feedback } from './feedback';

export class FeedbackTestUtilities {
  public static getFakeFeedbacks(numberOfFakeRecords: number): Feedback[] {
    const returnValues: Feedback[] = new Array<Feedback>(numberOfFakeRecords);

    let temp: Feedback;

    for (let index = 0; index < numberOfFakeRecords; index++) {
      temp = this.getFakeFeedback(index);

      returnValues[index] = temp;
    }

    return returnValues;
  }

  public static getFakeFeedback(itemNumber: number = 0): Feedback {
    const temp = new Feedback();
    const itemNumberAsString = itemNumber.toString();

    temp.feedbackType = 'fake feedback type' + itemNumberAsString;
    temp.sentiment = 'fake sentiment' + itemNumberAsString;
    temp.subject = 'fake notification subject' + itemNumberAsString;
    temp.feedbackText = 'fake message' + itemNumberAsString;
    temp.username = 'fake username' + itemNumberAsString;
    temp.firstName = 'fake first name' + itemNumberAsString;
    temp.lastName = 'fake last name' + itemNumberAsString;
    temp.referer = 'fake referer' + itemNumberAsString;
    temp.userAgent = 'fake user agent' + itemNumberAsString;
    temp.ipAddress = 'fake ip address' + itemNumberAsString;
    temp.isContactRequest = true;
    temp.id = 'Id'.length + itemNumber;
    temp.status = 'fake Status' + itemNumberAsString;
    temp.createdBy = 'fake Created By' + itemNumberAsString;
    temp.createdDate = new Date(new Date().getDate() + itemNumber);
    temp.lastModifiedBy = 'fake Last Modified By' + itemNumberAsString;
    temp.lastModifiedDate = new Date(new Date().getDate() + itemNumber);
    temp.timestamp = 'fake Timestamp' + itemNumberAsString;

    return temp;
  }
}
