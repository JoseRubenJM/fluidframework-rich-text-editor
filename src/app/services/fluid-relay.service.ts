import { Injectable } from '@angular/core';
import {
	AzureClient,
	AzureConnectionConfig,
	AzureFunctionTokenProvider,
} from "@fluidframework/azure-client";
import { InsecureTokenProvider } from "@fluidframework/test-client-utils";

@Injectable({
  providedIn: 'root'
})
export class AzureFluidRelayService {
  type: any = 'remote'
  client: any = ''

  constructor() {
    const clientProps = {
			connection: {
				type: this.type,
				tenantId: "58ac4cc5-399e-4fcc-a01f-b5ce17dcf891",
				tokenProvider: new InsecureTokenProvider("a438d403becde61cbd444f59d2f7a07b", { id: "123" }),
				endpoint: "https://us.fluidrelay.azure.com",
			},
		}

		this.client = new AzureClient(clientProps);
   }

   getClient(): AzureClient {
    return this.client
   }

   
}
