import {DebugSession, InitializedEvent, Thread, TerminatedEvent} from 'vscode-debugadapter';
import { DebugProtocol } from 'vscode-debugprotocol';

interface LaunchRequestArguments extends DebugProtocol.LaunchRequestArguments {
}

interface AttachRequestArguments extends DebugProtocol.AttachRequestArguments {
}

export class ViceDebugSession extends DebugSession {
	private static THREAD_ID = 1;

	protected async launchRequest(response: DebugProtocol.LaunchResponse, args: LaunchRequestArguments) {
		// TODO start VICE here
		this.sendEvent(new InitializedEvent());
		this.sendResponse(response);
	}

	protected async attachRequest(response: DebugProtocol.AttachResponse, args: AttachRequestArguments) {
		// TODO attach to VICE here
		this.sendEvent(new InitializedEvent());
		this.sendResponse(response);
	}

	protected async disconnectRequest(response: DebugProtocol.DisconnectResponse, args: DebugProtocol.DisconnectArguments) {
		// TODO stop or detach from VICE here
		this.sendEvent(new TerminatedEvent());
		this.sendResponse(response);
	}

	protected setBreakPointsRequest(response: DebugProtocol.SetBreakpointsResponse, args: DebugProtocol.SetBreakpointsArguments): void {
		response.body = {
			breakpoints: []
		};
		this.sendResponse(response);
	}

	protected threadsRequest(response: DebugProtocol.ThreadsResponse): void {
		response.body = {
			threads: [
				new Thread(ViceDebugSession.THREAD_ID, "CPU")
			]
		};
		this.sendResponse(response);
	}

}
