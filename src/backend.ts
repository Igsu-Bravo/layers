import { Component, attribute, method, expose } from '@layr/component';
import { ComponentHTTPServer } from '@layr/component-http-server';

export class Main extends Component {
    // The expose decorator allows "name" to be set remotely
    @expose({ set: true }) @attribute('string') name = 'OK!';

    // Here we can call "health()" remotely
    @expose({ call: true }) @method() async health(): Promise<string> {
        return `Server ${this.name}`
    }
}

const server = new ComponentHTTPServer(Main, { port: 3210 });

server.start();