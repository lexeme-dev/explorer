import Cluster from "./Cluster";

export default interface Opinion {
    id: number;
    cluster: Cluster;
    resource_id: number;
    opinion_uri: string;
}