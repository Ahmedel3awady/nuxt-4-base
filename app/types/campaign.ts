export interface ICampaign {

  id: number;
  name: string;
  description: string;
  image: string;
  starting_time: string;
  ending_time: string;
  daily_limit: number;
  users?: Array<{
    id: number;
    name: string;
  }>;
  created_at: string;
  updated_at: string;
}