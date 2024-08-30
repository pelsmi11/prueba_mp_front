import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { getFiscalRequest, createFiscalRequest, updateFiscalRequest} from "../api/profile";

const ProfileContext = createContext();

export const useProfiles = () => {
    const context = useContext(ProfileContext);

    if (!context) {
        throw new Error("useCases must be used within a CaseProvider")
    }

    return context;
}

export function ProfileProvider({ children }) {


    const createProfile = async (caso) => {
        try {
            const res = await createFiscalRequest(caso);
            return res;
        } catch (error) {
            console.error("Error creating case:", error);
            throw error;
        }
    };


    const getProfile = async (id) => {
        try {
            const res = await getFiscalRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateProfile = async (id, data) => {
        try {
            return await updateFiscalRequest(id, data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <ProfileContext.Provider value={{
            useProfiles, createProfile, getProfile, updateProfile
        }}>
            {children}
        </ProfileContext.Provider>
    );
}

ProfileProvider.propTypes = {
    children: PropTypes.node.isRequired,
};