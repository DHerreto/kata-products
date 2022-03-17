import { TestBed } from "@angular/core/testing";
import { MessageService } from "./message.service";

describe('MessageService', () => {
  let messageService: MessageService;

  beforeEach(() => {

    messageService = TestBed.inject(MessageService);
  });

  afterEach(() => {
    messageService.messages = [];
  });

  it('should be created', () => {
    expect(messageService).toBeTruthy();
  });

  it('should have a empty messages pool ', () => {
    expect(messageService.messages.length).toBe(0);
  })

  it('should have a method for adding messages', () => {
    messageService.add('mock message');
    expect(messageService.messages.length).toBe(1);
    expect(messageService.messages[0]).toBe('mock message');
  });

  it('should have a method for clearing the messages pool', () => {
    messageService.add('mock message 01');
    messageService.add('mock message 02');
    messageService.add('mock message 03');

    expect(messageService.messages.length).toBe(3);

    messageService.clear();
    expect(messageService.messages.length).toBe(0);

  });

});
