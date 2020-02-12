import { MongoClient } from 'mongodb';
import { UpdateWriteOpResult, Db, DbCollectionOptions } from 'mongodb';
import { Telegraf, ContextMessageUpdate } from 'telegraf';

declare module 'telegraf-session-mongodb' {
  interface TelegrafSessionMongoOptions extends DbCollectionOptions {
    collectionName: string;
    sessionName: string;
  }
  
  class TelegrafMongoSession {
    constructor(db: Db, options: TelegrafSessionMongoOptions);
    saveSession(key: string, session: any): Promise<UpdateWriteOpResult>;
    getSession(key: string): Promise<any>;
    getSessionKey(ctx: ContextMessageUpdate): string;
    middleware(ctx: ContextMessageUpdate, next: any): void;
    static setup(bot: Telegraf<ContextMessageUpdate>, mongo_url: string, params?: TelegrafSessionMongoOptions): Promise<MongoClient>;
  }

  export function middleware(db: Db, options?: TelegrafSessionMongoOptions): (ctx: ContextMessageUpdate, next: any) => void;
}
