import React from 'react'
import Title from '@common/components/ui/title/Title.jsx'

const TitleList = ({ title, type, link }) => {
    return (
        <div className="category-title-block">
            <Title text={title} className="padding-0" />
            {type && link && (
                <div className="category-line-block">
                    <span className="category-line"></span>
                    <div className="all-categories-desktop">
                        <a href={link} className="all-categories-btn">
                            {type}
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TitleList;