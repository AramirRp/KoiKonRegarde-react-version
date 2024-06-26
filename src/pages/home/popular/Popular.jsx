import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";

const Popular = () => {
    const [endpoint, setEndpoint] = useState("movie");

    const { data, loading } = useFetch(`/movie/popular`);

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Populaire</span>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
        </div>
    );
};

export default Popular;