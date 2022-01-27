import Cluster from './Cluster';

interface Opinion {
    id: number;
    cluster: Cluster;
    resource_id: number;
    opinion_uri: string;
    parentheticals?: string[];
}

export interface OpinionSuggestion extends Opinion {
    headline: string;
}

export var courtIdToName: { [id: string]: string; } = {
    scotus: "Supreme Court",
    ca1: "1st Cir.",
    ca2: "2nd Cir.",
    ca3: "3rd Cir.",
    ca4: "4th Cir.",
    ca5: "5th Cir.",
    ca6: "6th Cir.",
    ca7: "7th Cir.",
    ca8: "8th Cir.",
    ca9: "9th Cir.",
    ca10: "10th Cir.",
    ca11: "11th Cir.",
    cafc: "Fed. Cir.",
    cadc: "D.C. Cir.",
};

export const fullCaseName = ({ cluster }: Opinion): string => {
    let opinionDisplayText = cluster.case_name;
    if (cluster.reporter != null) {
        opinionDisplayText += `, ${cluster.reporter}`;
    }
    if (cluster.court == "scotus") {
        opinionDisplayText += ` (${cluster.year})`;
    } else {
        opinionDisplayText += ` (${courtIdToName[cluster.court]} ${cluster.year})`;
    }
    return opinionDisplayText;
};

export default Opinion;
