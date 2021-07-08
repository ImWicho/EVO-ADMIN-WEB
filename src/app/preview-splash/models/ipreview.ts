export interface IPreview {
  id_splash?:        number;
  title?:            string;
  subtitle?:         string;
  navigation_time?:  number;
  infinite_time?:    boolean;
  background_image?: null | string;
  predefined_image?: boolean | string;
  logo_image?:       null;
  nsat_usage_ssid?:  string;
  is_active?:        boolean;
  creation_date?:    Date;
  auth_facebook?:    boolean;
  auth_google?:      boolean;
  fields:           Field[];
}

export interface Field {
  alias?: string;
  id_fields:    number;
  field_name:   string;
  field_type?:   string;
  is_required?:  boolean;
  is_footfall?:  boolean;
  field_extras?: { [key: string]: string };
  id_splash?:    number;
}
