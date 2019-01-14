/// <reference types="jest" />

import * as React from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import NodeFrontend from '../components/NodeFrontend';
import { INodeFrontendProps } from '../components/INodeFrontendProps';
import { INodeFrontendState } from '../components/INodeFrontendState';
//import { AadTokenProviderFactory, AadTokenProvider } from '@microsoft/sp-http';

import * as sinon from 'sinon';

describe('NodeFrontend basic tests', () => {

    let reactComponent: ReactWrapper<INodeFrontendProps, INodeFrontendState>;
    let aadTokenProviderFactoryStub: sinon.SinonStub;
    let aadTokenProviderStub: sinon.SinonStub;
    let fetchStub: sinon.SinonStub;

    beforeEach(() => {

        // create stubs and face SPFx aad provider and fetch call to the api
        //aadTokenProviderFactoryStub = sinon.stub(AadTokenProviderFactory.prototype, 'getTokenProvider').resolves(new AadTokenProvider());
        //aadTokenProviderStub = sinon.stub(AadTokenProvider.prototype, 'getToken').resolves('abc');
        // fetchStub = sinon.stub(Window.prototype, 'fetch').resolves(() => {
        //     return new Response(JSON.stringify({ "message": "Secure response from Node.js API endpoint" }), {
        //         status: 200,
        //         headers: { 'Content-type': 'application/json' }
        //     });
        // });

        reactComponent = mount(React.createElement(
            NodeFrontend,
            {
                description: 'desc',
                aadTokenProvider: null //new AadTokenProviderFactory()
            }
        ));
    });

    afterEach(() => {
        //aadTokenProviderFactoryStub.restore();
        //aadTokenProviderStub.restore();
        //fetchStub.restore();
        reactComponent.unmount();
    });

    it('should root web part element exists', () => {

        // define the css selector
        let cssSelector: string = '#nodeFrontend';

        // find the element using css selector
        const element = reactComponent.find(cssSelector);
        expect(element.length).toBeGreaterThan(0);
    });

    it('should has the correct title', () => {

        // Arrange
        // define contains/like css selector
        let cssSelector: string = 'h1';

        // Act
        // find the elemet using css selector
        const text = reactComponent.find(cssSelector).text();

        // Assert
        expect(text).toBe("Welcome to SharePoint!");
    });
});

// Usefull links:
// https://reactjs.org/docs/test-renderer.html
// https://github.com/airbnb/enzyme