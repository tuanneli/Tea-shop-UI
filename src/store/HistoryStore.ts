import {IHistory} from "../types/customerTypes";
import {CustomerService} from "../api/API";

export default class HistoryStore {
    _history = {} as IHistory;

    get history() {
        return this._history;
    }

    _errorMessage = "";

    get errorMessage() {
        return this._errorMessage;
    }

    setHistory(historyData: IHistory) {
        this._history = historyData;
    }

    setErrorMessage(message: string) {
        this._errorMessage = message;
    }

    async addHistory(history: IHistory, customerId: string) {
        try {
            const response = await CustomerService.addHistory(history, customerId);
            this.setHistory(response.data);
            this.setErrorMessage("");
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data?.message);
            this.setErrorMessage(e.response?.data?.message);
        }
    }
}