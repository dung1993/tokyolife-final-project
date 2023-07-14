import React from "react";
import { useEffect } from "react";

const FiltersTag = ({ filtersTag, title }) => {

    console.log(filtersTag);
    useEffect(() => {

    }, [])
    return (

        filtersTag?.length > 0 ? <span className="filter-tag me-2">
            {title}: {filtersTag?.join(',')}
        </span> : <></>
    );
}

export default FiltersTag