import * as React from 'react';
import styles from './NodeFrontend.module.scss';
import { INodeFrontendProps } from './INodeFrontendProps';
import { escape } from '@microsoft/sp-lodash-subset';

//import { AadTokenProvider } from '@microsoft/sp-http';
import { INodeFrontendState } from './INodeFrontendState';

export default class NodeFrontend extends React.Component<INodeFrontendProps, INodeFrontendState> {

  constructor(props: INodeFrontendProps) {
    super(props);

    this.state = {
      apiResponseMessage: ''
    };
  }

  public render(): React.ReactElement<INodeFrontendProps> {
    return (
      <div className={styles.nodeFrontend} id='nodeFrontend'>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <h1 className={styles.title}>Welcome to SharePoint!</h1>
              <p className={styles.description}>{escape(this.props.description)}</p>

              <button className={styles.button} id="buyButton" onClick={this.getApiResponseMessage.bind(this)}>
                Reqeust message from the Node.js server.
              </button>

              {this.state.apiResponseMessage && <h2>{this.state.apiResponseMessage}</h2>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  public getApiResponseMessage(): void {

    this.props.aadTokenProvider
      .getTokenProvider()
      .then((tokenProvider: any): Promise<string> => {

        // retrieve access token for the enterprise API secured with Azure AD
        return tokenProvider.getToken('74f4223e-fb8a-499f-b851-2ae8c72553fa');
      })
      .then((accessToken: string): void => {

        console.log(accessToken);

        fetch('https://nodesharepointapi.azurewebsites.net/api/secured', {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          },
        })
          .then(response => response.json())
          .then((responseJson) => {

            console.log(JSON.stringify(responseJson));

            this.setState((state: INodeFrontendState): INodeFrontendState => {
              state.apiResponseMessage = JSON.stringify(responseJson);
              return state;
            });
          });
      });
  }
}
