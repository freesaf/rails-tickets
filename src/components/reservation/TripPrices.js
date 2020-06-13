import React from "react";

export default function TripPrices() {
  return (
    <div className="shadow-lg bg-white ">
      <div
        className="category-wrapper eco bg-gray-500"
        data-bind="css: { 'small-list' : (availabilityFarePrices.fareCategories.ECONOMY.subcategories.length < 2) }">
        <div className="category-title">
          <span data-bind="i18n-text: { key: 'noclassNamecabintypelookup.economy' }">
            ECONOMY
          </span>
        </div>
        <div className="category-list">
          <div
            className="category-item economy"
            data-bind="click: category.status == 'AVAILABLE' ? $parent.selectPanelFlight.bind(category, 'ECONOMY') : null, css: { 'disabled' : (category &amp;&amp; category.status !== 'AVAILABLE') }">
            <div className="content">
              <div className="details-part">
                <div className="className-detail">
                  <span
                    className="right-add-comma"
                    data-bind="i18n-text: { key: $parent.brandText + category.brandCode }">
                    EcoFly
                  </span>
                  <span data-bind="i18n-text: { key: 'Availability.FlightList.BrandCard.className', args: { 'classNameCodes' : category.fareclassNamees.join('-') } } ">
                    W className
                  </span>
                </div>
                <div className="brand-detail-wrapper">
                  <div className="brand-detail-list inline-list show-more">
                    <span
                      className="brand-detail-item right-add-comma"
                      data-bind="i18n-textWithOptionalField: { key: 'Availability.FlightList.BrandCard.DomesticBrandDetails.' + key, args: args, optionalField: category.brandCode}">
                      15 kg baggage
                    </span>

                    <span
                      className="brand-detail-item right-add-comma"
                      data-bind="i18n-textWithOptionalField: { key: 'Availability.FlightList.BrandCard.DomesticBrandDetails.' + key, args: args, optionalField: category.brandCode}">
                      1 piece X 8 kg cabin baggage
                    </span>
                  </div>
                </div>
              </div>
              <div className="price-detail">
                <div
                  className="price"
                  data-bind="price : { hideDecimal: $root.hideDecimal, roundingMode: $root.roundingMode, sub: true, currency: category.price.currency || category.price[$root.preferredCurrency()].currency, amount: category.price.amount || category.price[$root.preferredCurrency()].amount}">
                  <span className="price-column-currency">TRY</span>
                  <span className="ws-nowrap">222</span>
                  <span className="price-column-decimal">,99</span>
                </div>
              </div>
              {/* <!-- ko if: category.status == 'SOLDOUT' --><!-- /ko --> */}
            </div>
          </div>

          <div
            className="category-item economy"
            data-bind="click: category.status == 'AVAILABLE' ? $parent.selectPanelFlight.bind(category, 'ECONOMY') : null, css: { 'disabled' : (category &amp;&amp; category.status !== 'AVAILABLE') }">
            <div className="content">
              {/* <!-- ko if: category.status == 'AVAILABLE' --> */}
              <div className="details-part">
                <div className="className-detail">
                  <span
                    className="right-add-comma"
                    data-bind="i18n-text: { key: $parent.brandText + category.brandCode }">
                    ExtraFly
                  </span>
                  <span data-bind="i18n-text: { key: 'Availability.FlightList.BrandCard.className', args: { 'classNameCodes' : category.fareclassNamees.join('-') } } ">
                    W className
                  </span>
                  <span
                    className="adviced"
                    data-bind="i18n-text: {key: 'Availability.FlightList.BrandCard.Adviced'}">
                    Recommended
                  </span>
                </div>
                {/* <!-- ko if: $parent.showRecommended --> */}
                <div className="brand-detail-wrapper">
                  <div className="brand-detail-list inline-list show-more">
                    {/* <!-- ko foreach: category.rights --> */}
                    <span
                      className="brand-detail-item right-add-comma"
                      data-bind="i18n-textWithOptionalField: { key: 'Availability.FlightList.BrandCard.DomesticBrandDetails.' + key, args: args, optionalField: category.brandCode}">
                      20 kg baggage
                    </span>

                    <span
                      className="brand-detail-item right-add-comma"
                      data-bind="i18n-textWithOptionalField: { key: 'Availability.FlightList.BrandCard.DomesticBrandDetails.' + key, args: args, optionalField: category.brandCode}">
                      1 piece X 8 kg cabin baggage
                    </span>

                    <span
                      className="brand-detail-item right-add-comma"
                      data-bind="i18n-textWithOptionalField: { key: 'Availability.FlightList.BrandCard.DomesticBrandDetails.' + key, args: args, optionalField: category.brandCode}">
                      Standard seat selection
                    </span>

                    <span
                      className="brand-detail-item right-add-comma"
                      data-bind="i18n-textWithOptionalField: { key: 'Availability.FlightList.BrandCard.DomesticBrandDetails.' + key, args: args, optionalField: category.brandCode}">
                      250 extra Miles
                    </span>

                    <span
                      className="brand-detail-item right-add-comma"
                      data-bind="i18n-textWithOptionalField: { key: 'Availability.FlightList.BrandCard.DomesticBrandDetails.' + key, args: args, optionalField: category.brandCode}">
                      Free reissue
                    </span>

                    <span
                      className="brand-detail-item right-add-comma"
                      data-bind="i18n-textWithOptionalField: { key: 'Availability.FlightList.BrandCard.DomesticBrandDetails.' + key, args: args, optionalField: category.brandCode}">
                      Deduction refund
                    </span>
                  </div>
                </div>
              </div>
              <div className="price-detail">
                <div
                  className="price"
                  data-bind="price : { hideDecimal: $root.hideDecimal, roundingMode: $root.roundingMode, sub: true, currency: category.price.currency || category.price[$root.preferredCurrency()].currency, amount: category.price.amount || category.price[$root.preferredCurrency()].amount}">
                  <span className="price-column-currency">TRY</span>
                  <span className="ws-nowrap">262</span>
                  <span className="price-column-decimal">,99</span>
                </div>
              </div>
              {/* <!-- ko if: category.status == 'SOLDOUT' --><!-- /ko --> */}
            </div>
          </div>

          <div
            className="category-item economy"
            data-bind="click: category.status == 'AVAILABLE' ? $parent.selectPanelFlight.bind(category, 'ECONOMY') : null, css: { 'disabled' : (category &amp;&amp; category.status !== 'AVAILABLE') }">
            <div className="content">
              <div className="details-part">
                <div className="className-detail">
                  <span
                    className="right-add-comma"
                    data-bind="i18n-text: { key: $parent.brandText + category.brandCode }">
                    PrimeFly
                  </span>
                  <span data-bind="i18n-text: { key: 'Availability.FlightList.BrandCard.className', args: { 'classNameCodes' : category.fareclassNamees.join('-') } } ">
                    W className
                  </span>
                </div>
                <div className="brand-detail-wrapper">
                  <div className="brand-detail-list inline-list show-more">
                    <span
                      className="brand-detail-item right-add-comma"
                      data-bind="i18n-textWithOptionalField: { key: 'Availability.FlightList.BrandCard.DomesticBrandDetails.' + key, args: args, optionalField: category.brandCode}">
                      25 kg baggage
                    </span>

                    <span
                      className="brand-detail-item right-add-comma"
                      data-bind="i18n-textWithOptionalField: { key: 'Availability.FlightList.BrandCard.DomesticBrandDetails.' + key, args: args, optionalField: category.brandCode}">
                      1 piece X 8 kg cabin baggage
                    </span>

                    <span
                      className="brand-detail-item right-add-comma"
                      data-bind="i18n-textWithOptionalField: { key: 'Availability.FlightList.BrandCard.DomesticBrandDetails.' + key, args: args, optionalField: category.brandCode}">
                      Standard seat selection
                    </span>

                    <span
                      className="brand-detail-item right-add-comma"
                      data-bind="i18n-textWithOptionalField: { key: 'Availability.FlightList.BrandCard.DomesticBrandDetails.' + key, args: args, optionalField: category.brandCode}">
                      500 extra Miles
                    </span>

                    <span
                      className="brand-detail-item right-add-comma"
                      data-bind="i18n-textWithOptionalField: { key: 'Availability.FlightList.BrandCard.DomesticBrandDetails.' + key, args: args, optionalField: category.brandCode}">
                      Free reissue
                    </span>

                    <span
                      className="brand-detail-item right-add-comma"
                      data-bind="i18n-textWithOptionalField: { key: 'Availability.FlightList.BrandCard.DomesticBrandDetails.' + key, args: args, optionalField: category.brandCode}">
                      Full refund (up to 12 hours)
                    </span>
                  </div>
                </div>
              </div>
              <div className="price-detail">
                <div
                  className="price"
                  data-bind="price : { hideDecimal: $root.hideDecimal, roundingMode: $root.roundingMode, sub: true, currency: category.price.currency || category.price[$root.preferredCurrency()].currency, amount: category.price.amount || category.price[$root.preferredCurrency()].amount}">
                  <span className="price-column-currency">TRY</span>
                  <span className="ws-nowrap">322</span>
                  <span className="price-column-decimal">,99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="category-wrapper bus small-list bg-red-300"
        data-bind="css: { 'small-list' : (availabilityFarePrices.fareCategories.BUSINESS.subcategories.length < 2) }">
        <div className="category-title">
          <span data-bind="i18n-text: { key: 'noclassNamecabintypelookup.business' }">
            BUSINESS
          </span>
        </div>
        <div className="category-list">
          <div
            className="category-item business"
            data-bind="click: category.status == 'AVAILABLE' ? $parent.selectPanelFlight.bind(category, 'BUSINESS') : null, css: { 'disabled' : (category &amp;&amp; category.status !== 'AVAILABLE') }">
            <div className="content">
              <div className="details-part">
                <div className="className-detail">
                  <span
                    className="right-add-comma"
                    data-bind="i18n-text: { key: $parent.brandText + category.brandCode }">
                    Business
                  </span>
                  <span data-bind="i18n-text: { key: 'Availability.FlightList.BrandCard.className', args: { 'classNameCodes' : category.fareclassNamees.join('-') } } ">
                    J className
                  </span>
                </div>
                <div className="brand-detail-wrapper">
                  <div className="brand-detail-list inline-list show-more">
                    <span
                      className="brand-detail-item right-add-comma"
                      data-bind="i18n-textWithOptionalField: { key: 'Availability.FlightList.BrandCard.DomesticBrandDetails.' + key, args: args, optionalField: category.brandCode}">
                      30 kg baggage
                    </span>

                    <span
                      className="brand-detail-item right-add-comma"
                      data-bind="i18n-textWithOptionalField: { key: 'Availability.FlightList.BrandCard.DomesticBrandDetails.' + key, args: args, optionalField: category.brandCode}">
                      2 pieces X 8 kg cabin baggage
                    </span>

                    <span
                      className="brand-detail-item right-add-comma"
                      data-bind="i18n-textWithOptionalField: { key: 'Availability.FlightList.BrandCard.DomesticBrandDetails.' + key, args: args, optionalField: category.brandCode}">
                      Standard seat selection
                    </span>

                    <span
                      className="brand-detail-item right-add-comma"
                      data-bind="i18n-textWithOptionalField: { key: 'Availability.FlightList.BrandCard.DomesticBrandDetails.' + key, args: args, optionalField: category.brandCode}">
                      Special meal
                    </span>

                    <span
                      className="brand-detail-item right-add-comma"
                      data-bind="i18n-textWithOptionalField: { key: 'Availability.FlightList.BrandCard.DomesticBrandDetails.' + key, args: args, optionalField: category.brandCode}">
                      Business Lounge
                    </span>

                    <span
                      className="brand-detail-item right-add-comma"
                      data-bind="i18n-textWithOptionalField: { key: 'Availability.FlightList.BrandCard.DomesticBrandDetails.' + key, args: args, optionalField: category.brandCode}">
                      Free reissue
                    </span>

                    <span
                      className="brand-detail-item right-add-comma"
                      data-bind="i18n-textWithOptionalField: { key: 'Availability.FlightList.BrandCard.DomesticBrandDetails.' + key, args: args, optionalField: category.brandCode}">
                      Full refund (up to 12 hours)
                    </span>
                  </div>
                </div>
              </div>
              <div className="price-detail">
                <div
                  className="price"
                  data-bind="price : { hideDecimal: $root.hideDecimal, roundingMode: $root.roundingMode, sub: true, currency: category.price.currency || category.price[$root.preferredCurrency()].currency, amount: category.price.amount || category.price[$root.preferredCurrency()].amount}">
                  <span className="price-column-currency">TRY</span>
                  <span className="ws-nowrap">617</span>
                  <span className="price-column-decimal">,99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
