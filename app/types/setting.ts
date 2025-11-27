export interface ISettingTranslation {
  footer: string;
}

export interface ISetting {
  id: number;
  image?: string;
  translations: {
    ar: ISettingTranslation;
    en: ISettingTranslation;
  };
}

export interface IPackageModel {
  id: number;
  name: string;
  is_active: boolean;
}

