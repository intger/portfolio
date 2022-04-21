import React from 'react';
import { useStaticQuery,  graphql  } from 'gatsby';

import MenuItem from './MenuItem/MenuItem';

const MenuItems = () => {
    const data = useStaticQuery(graphql`
        query MenuQuery {
            allWpMenu(filter: {locations: {eq: PRIMARY}}) {
                totalCount
                nodes {
                    id
                    name
                    locations
                    menuItems {
                        nodes {
                            url
                            target
                            label
                            id
                            cssClasses
                        }
                    }
                }
            }
        }
    `);
    const menuItems = data.allWpMenu.nodes[0].menuItems.nodes;
    let menuElements;
    
    menuElements = menuItems.map((item) => {
      return (
        <MenuItem
          key={item.id}
          title={item.label}
          link={item.url}
          target={item.target}
          extraClass={item.cssClasses}
        />
      );
    });

    return menuElements;
}

export default MenuItems;    