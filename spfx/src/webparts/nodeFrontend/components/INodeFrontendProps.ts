import { AadTokenProviderFactory } from "@microsoft/sp-http";

export interface INodeFrontendProps {
  description: string;
  aadTokenProvider: AadTokenProviderFactory;
}
