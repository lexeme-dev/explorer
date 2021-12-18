interface Cluster {
    id: number;
    case_name: string;
    resource_id: number;
    reporter?: string;
    year: number;
    citation_count: number;
    time: number;
    cluster_uri: string;
    court: string;
    docket_uri: string;
}

export default Cluster;
