import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'NodeFrontendWebPartStrings';
import NodeFrontend from './components/NodeFrontend';
import { INodeFrontendProps } from './components/INodeFrontendProps';

export interface INodeFrontendWebPartProps {
  description: string;
}

export default class NodeFrontendWebPart extends BaseClientSideWebPart<INodeFrontendWebPartProps> {

  public render(): void {
    const element: React.ReactElement<INodeFrontendProps > = React.createElement(
      NodeFrontend,
      {
        description: this.properties.description, 
        aadTokenProvider: this.context.aadTokenProviderFactory
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
