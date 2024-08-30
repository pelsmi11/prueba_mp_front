import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { createCaseRequest, getCasesRequest, deleteCaseRequest, getCaseRequest, updateCaseRequest } from "../api/case";

const CaseContext = createContext();

export const useCases = () => {
    const context = useContext(CaseContext);

    if (!context) {
        throw new Error("useCases must be used within a CaseProvider")
    }

    return context;
}

export function CaseProvider({ children }) {
    const [cases, setCases] = useState({});

    const getCases = async () => {
        try {
            const res = await getCasesRequest();
            setCases(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const createCase = async (caso) => {
        try {
            const res = await createCaseRequest(caso);
            return res;
        } catch (error) {
            console.error("Error creating case:", error);
            throw error;
        }
    };

    const deleteCase = async (id) => {
        try {
            const res = await deleteCaseRequest(id);
            if (res.status == 200) {
                setCases(cases.filter(caso => caso.id != id))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getCase = async (id) => {
        try {
            const res = await getCaseRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateCase = async (id, data) => {
        try {
            return await updateCaseRequest(id, data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <CaseContext.Provider value={{
            cases, createCase, getCases, deleteCase, getCase, updateCase
        }}>
            {children}
        </CaseContext.Provider>
    );
}

CaseProvider.propTypes = {
    children: PropTypes.node.isRequired,
};