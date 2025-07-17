export interface Article {
  _id: string;
  web_url: string;
  abstract: string;
  headline: {
    main: string;
  };
  pub_date: string;
  byline: {
    original?: string;
  };
  multimedia?: {
    caption?: string;
    credit?: string;
    default?: {
      url?: string;
      height?: number;
      width?: number;
    };
    thumbnail?: {
      url?: string;
      height?: number;
      width?: number;
    };
  };
}
