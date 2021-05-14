import Cluster from './Cluster';

interface Opinion {
    id: number;
    cluster: Cluster;
    resource_id: number;
    opinion_uri: string;
    parentheticals?: string[];
}

export const fullCaseName = ({ cluster }: Opinion): string => {
    let opinionDisplayText = cluster.case_name;
    if (cluster.reporter != null) {
        opinionDisplayText += `, ${cluster.reporter}`;
    }
    opinionDisplayText += ` (${cluster.year})`;
    return opinionDisplayText;
};

export default Opinion;
