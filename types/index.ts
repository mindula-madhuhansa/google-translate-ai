import { Document } from "mongoose";

export interface TranslationLanguages {
  translation: {
    [key: string]: {
      name: string;
      nativeName: string;
      dir: "ltr" | "rtl";
    };
  };
}

export interface State {
  inputLanguage: string;
  input: string;
  outputLanguage: string;
  output: string;
}

export interface ITranslation extends Document {
  timestamp: Date;
  fromText: string;
  from: string;
  toText: string;
  to: string;
}

export interface Translation {
  fromText: string;
  from: string;
  toText: string;
  to: string;
}

export interface IUser extends Document {
  userId: string;
  translations: Array<ITranslation>;
}
