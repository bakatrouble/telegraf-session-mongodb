import { MongoClient } from 'mongodb';
import { UpdateWriteOpResult, Db, DbCollectionOptions } from 'mongodb';
import { Telegraf, ContextMessageUpdate } from 'telegraf';

declare module 'telegraf-session-mongodb' {
  class TelegrafMongoSession {
    constructor(db: Db, options: DbCollectionOptions);
    saveSession(key: string, session: any): Promise<UpdateWriteOpResult>;
    getSession(key: string): Promise<any>;
    getSessionKey(ctx: ContextMessageUpdate): string;
    middleware(ctx: ContextMessageUpdate, next: any): void;
    static setup(bot: Telegraf<ContextMessageUpdate>, mongo_url: string, params?: DbCollectionOptions): Promise<MongoClient>;
  }

  export function middleware(db: Db, options?: DbCollectionOptions): (ctx: ContextMessageUpdate, next: any) => void;
}
