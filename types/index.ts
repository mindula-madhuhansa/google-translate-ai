interface TranslationLanguages {
  translation: {
    [key: string]: {
      name: string;
      nativeName: string;
      dir: "ltr" | "rtl";
    };
  };
}

interface State {
  inputLanguage: string;
  input: string;
  outputLanguage: string;
  output: string;
}
