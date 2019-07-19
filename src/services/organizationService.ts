import {ReperioCoreConnector} from "./connector";
import { CreateOrganization } from "../models/createOrganization";

export class OrganizationService {
    constructor(public connector: ReperioCoreConnector) { }
    
    async getOrganizationById(organizationId: string) {
        return await this.connector.axios.get(`/organizations/${organizationId}`);
    }

    async getOrganizations() {
        return await this.connector.axios.get(`/organizations`);
    }

    async getOrganizationsByUser(userId: string) {
        return await this.connector.axios.get(`/organizations/user/${userId}`);
    }

    async createOrganization(name: string, userId: string[]) {
        const payload = {
            name, 
            personal: false, 
            userId
        }
        return await this.connector.axios.post(`/organizations`, payload);
    }

    async createOrganizationWithAddress(userId: string, organization: CreateOrganization) {
        const payload = {
            name: organization.name,
            personal: false,
            userId: userId,
            address: {
                streetAddress: organization.streetAddress,
                suiteNumber: organization.suiteNumber.toString(),
                city: organization.city,
                state: organization.state,
                zip: organization.zip.toString()
            }
        };

        return await this.connector.axios.post(`/organizations`, payload);
    }

    async editOrganization(organizationId: string, name: string, userIds: string[]) {
        const payload = {
            name, 
            userIds
        }
        return await this.connector.axios.put(`/organizations/${organizationId}`, payload);
    }

    async deleteOrganization(organizationId: string) {
        return await this.connector.axios.delete(`/organizations/${organizationId}`);
    }

    async postOrganizationApplication(organizationId: string, applicationId: string, userId: string) {
        return await this.connector.axios.post(`/organizations/${organizationId}/applications`, {applicationId, userId});
    }
    
    async enableOrganizationApplication(organizationId: string, applicationId: string, userId: string) {
        return await this.connector.axios.post(`/organizations/${organizationId}/applications/${applicationId}/enable`, {userId});
    }

    async sendNewCustomerEmail(organizationId: string) {
        return await this.connector.axios.post(`/organizations/${organizationId}/newCustomerEmail`, {baseURL: this.connector.config.baseURL});
    }
}