import Opinion, { OpinionSuggestion } from '../interfaces/Opinion';
import { CASES_SEARCH_ROUTE, CASES_RECOMMENDATIONS_ROUTE, CASES_SIMILAR_ROUTE, CASES_HTML_ROUTE } from './ServiceConstants';
import BaseService from './BaseService';

class CaseService extends BaseService {
    searchCases(query: string, max_cases: number): Promise<OpinionSuggestion[]> {
        return this.axios
            .get(CASES_SEARCH_ROUTE, { params: { query, max_cases } })
            .then((r) => r.data as OpinionSuggestion[]);
    }

    getRecommendedCases(
        opinions: Opinion[],
        courts: Set<string>,
        max_cases: number,
    ): Promise<Opinion[]> {
        const opinion_ids = opinions.map((op) => op.resource_id);
        return this.axios
            .get(CASES_RECOMMENDATIONS_ROUTE, {
                params: { courts: Array.from(courts.values()), cases: opinion_ids, max_cases },
            })
            .then((r) => r.data as Opinion[]);
    }

    getCaseHtml(opinion: Opinion):
        Promise<string> {
        return this.axios
            .get(CASES_HTML_ROUTE.replace("<int:resource_id>", "" + opinion.resource_id))
            .then((r) => r.data as string);
    }
}

export default CaseService;
