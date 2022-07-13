
export class Ranking {
    constructor(x) {
        this.da = x.da;
        this.equity = x.equity;
        this.sr_hlinks = x.sr_hlinks;
        this.sr_dlinks = x.sr_dlinks;
        this.id = x.id;
        this.pa = x.pa;
        this.sr_costs = x.sr_costs;
        this.mozrank = x.mozrank;
        this.links = x.links;
        this.fb_shares = x.fb_shares;
        this.fb_rec = x.fb_rec;
        this.fb_comments = x.fb_comments;
        this.sr_kwords = x.sr_kwords;
        this.sr_rank = x.sr_rank;
        this.sr_traffic = x.sr_traffic;
        this.sr_ulinks = x.sr_ulinks;
    }

    static fromFirestore(doc) {
        const data = doc.data();

        if (!data) return null;

        return new Ranking({
            id: doc.id,
            da: data['da'] ? data['da'] :data['da'],
            equity: data['equity'] ? data['equity'] : data['equity'],
            fb_comments: data['fb_comments'] ? data['fb_comments'] : data['fb_comments'],
            fb_rec: data['fb_rec'] ? data['fb_rec'] :data['fb_rec'],
            fb_shares: data['fb_shares'] ? data['fb_shares'] : data['fb_shares'],
            links: data['links'] ? data['links'] : data['links'],
            mozrank: data['mozrank'] ? data['mozrank'] :data['mozrank'],
            pa: data['pa'] ? data['pa'] : data['pa'],
            sr_costs: data['sr_costs'] ? data['sr_costs'] : data['sr_costs'],
            sr_dlinks: data['sr_dlinks'] ? data['sr_dlinks'] :data['sr_dlinks'],
            sr_domain: data['sr_domain'] ? data['sr_domain'] : data['sr_domain'],
            sr_hlinks: data['sr_hlinks'] ? data['sr_hlinks'] : data['sr_hlinks'],
            sr_kwords: data['sr_kwords'] ? data['sr_kwords'] :data['sr_kwords'],
            sr_rank: data['sr_rank'] ? data['sr_rank'] : data['sr_rank'],
            sr_traffic: data['sr_traffic'] ? data['sr_traffic'] : data['sr_traffic'],
            sr_ulinks: data['sr_ulinks'] ? data['sr_ulinks'] : data['sr_ulinks'],
        });
    }

    toJson(x) {
        return {
            uuid: x.uuid,
            privacyPolicy: x.privacyPolicy,
            timestampAdded: x.timestampAdded,
        };
    }
}