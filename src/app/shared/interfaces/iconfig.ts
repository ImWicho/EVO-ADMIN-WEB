export interface IOrganization {
  id_organization: number;
  meraki_id: number | string;
  organization_rename: string;
  meraki_name: string;
}

export interface INetwork {
  id_network: number;
  meraki_org_id: string | number;
  meraki_id: string;
  network_rename: string;
  id_organization: number;
  meraki_name: string;
}

export interface IDevice {
  id_device: number;
  meraki_ntwk_id: number | string;
  area_name: string;
  meraki_id: number | string;
  id_network: number;
  meraki_name: string;
}

export interface IArea {
  id_data: number;
  area_name: string;
  area_image: string;
  green_limit: number;
  meraki_ntwk_id: number;
  red_limit: number;
  yellow_limit: number;
  max_capacity: number;
}
