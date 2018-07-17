import * as vscode from 'vscode';
import { WorkspaceFolder, DebugConfiguration, ProviderResult, CancellationToken } from 'vscode';
import * as Net from 'net';
import { ViceDebugSession } from './debug';


export function activate(context: vscode.ExtensionContext) {
    const provider = new ViceConfigurationProvider();
	context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('vice', provider));
	context.subscriptions.push(provider);
}

export function deactivate() {
}

class ViceConfigurationProvider implements vscode.DebugConfigurationProvider {

	private _server?: Net.Server;

	resolveDebugConfiguration(folder: WorkspaceFolder | undefined, config: DebugConfiguration, token?: CancellationToken): ProviderResult<DebugConfiguration> {
        if (!this._server) {
            this._server = Net.createServer(socket => {
                const session = new ViceDebugSession();
                session.setRunAsServer(true);
                session.start(<NodeJS.ReadableStream>socket, socket);
            }).listen(0);
        }
        config.debugServer = this._server.address().port;
		return config;
	}

	dispose() {
		if (this._server) {
			this._server.close();
		}
    }

}
