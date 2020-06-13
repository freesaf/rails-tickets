import React from "react";

export default function PassengerDetails() {
  return (
    <div>
      <section class="section" id="summary_content_id">
        <div class="container" id="flight-detail-tab">
          <div
            data-toggle="collapse"
            data-target="#flightDetailsDiv"
            class="row detail-button-div collapsed">
            <div
              class="col-xs-12 p-20 chevron-toggle"
              id="flight-detail-label">
              <i class="tk-icon-airplane-flight fs-22 mt-2 pull-left" />
              <a
                class="fs-22 fw700 gray ml-10"
                data-bind="i18n-text: {key: 'Label-TY-01'}">
                Flight details
              </a>
              <div class="pull-right mt-5">
                <i class="fa fa-chevron-down red" />
              </div>
            </div>
          </div>

          <div
            id="flightDetailsDiv"
            class="row collapse"
            style={{ height: "0px" }}>
            <div class="col-sm-12">
              <div
                class="grid-bottom"
                data-bind="attr: {id: 'inbound-section' + $index()}"
                id="inbound-section0">
                <h4 class="text-muted fs-14 fw700 mb-0">
                  <span
                    class="outbound-title pull-left"
                    data-bind="i18n-text: { key: 'TextField-OB-17.outbound'}">
                    OUTBOUND TRIP
                  </span>
                  <span class="icon-outbound">
                    <i class="icon-outbound-plane"></i>
                  </span>
                  <span data-bind="i18n-text: { key: 'TextField-OB-17.outbound'}"></span>{" "}
                  -->
                  <div class="dib ml-10 mr-10 pull-left">
                    <span class="border-left-grey ml-5"></span>
                  </div>
                  <span class="dib">
                    <i class="fa fa-edit fs-26 blue mr-5 ml-5 pull-left" />
                    <a
                      role="button"
                      tabindex="0"
                      class="fw500 fs-15 blue pull-left ml-5 mt-4"
                      data-bind="i18n-text: { key: 'Link-OB-41'} , click:  $root.changeThisFlight">
                      Change flight
                    </a>
                  </span>
                </h4>

                <div class="nomargin block pull-left">
                  <h4 class="fs-28 fw100 ls-1-5 pull-left">
                    <span data-bind="i18n-text: { key: 'TextField-OB-01' , args:{'DEP':selectedFlight.firstSegment.originAirport.code, 'ARR' : selectedFlight.lastSegment.destinationAirport.code, 'datewoyear' : moment.utc(selectedFlight.firstSegment.departureDateTime + selectedFlight.firstSegment.departureDateTimeTimeZoneRawOffset).format($root.dateFormat().fulldayfullmonth) }}">
                      Istanbul to Ankara on Saturday, June 27
                    </span>
                  </h4>
                </div>

                <div class="nomargin blue fs-16 fw700 ls-0-3 pull-left">
                  <a
                    data-bind="click: function(data, event) { $root.loadBookingFareRule($index())}, attr: { 'data-scrollTarget': '#inbound-section' + $index() }"
                    role="button"
                    tabindex="0"
                    class="fs-16 fw700 farerules-btn scroll-to-element farerules-grey"
                    data-scrolldelay="100"
                    data-scrolldir="bottom"
                    data-scrolltarget="#inbound-section0">
                    <span data-bind="i18n-text: { key: 'Link-OB-31'}">
                      Fare rules
                    </span>

                    <i class="fa fa-chevron-up ml-5"></i>
                  </a>
                </div>

                <div data-bind="if: selectedFlight.showFareRules">
                  <farerules params="isDomestic: domestic, paxCode: $parent.paxTypeCode(), value: {'fareRule': selectedFlight.fareRulesData }">
                    <div class="farerules-content widthfull pb-10">
                      <div class="row">
                        <div class="table-farerules widthfull">
                          <div
                            class="col-xs-12 fareColumn col-sm-3"
                            data-bind="css : ((($data.awardMilesRule &amp;&amp; ($data.awardMilesRule.STATUS || $data.awardMilesRule.BONUS || $data.awardMilesRule.TOTAL)) || $data.awardMileRules) ? 'col-sm-3' : 'col-sm-4')">
                            <div class="fareColumn-wrapper">
                              <div class="fareColumn-header">
                                <h4 class="fs-14 fw700">
                                  <span
                                    class="pr-5"
                                    data-bind="i18n-text: { key: 'Label-OB-170'} ">
                                    REISSUE*
                                  </span>

                                  <a
                                    class="no-border absolute"
                                    data-placement="bottom"
                                    data-toggle="tooltip"
                                    data-bind="attr:{'title':i18n.get('Tooltip-OB-07')}"
                                    title=""
                                    data-original-title="Information and charges shown in the reissue/rebooking rules section are only valid for this flight and apply to each passenger individually. Charges may vary according to currency fluctuations. If you make changes to a previous flight that you did not board, the terms and conditions specified for a no-show will apply. Any price difference that occurs when you make changes to a flight will be either refunded or collected. Ticket service fee is applied again for reissue transactions.">
                                    <i class="fa fa-info-circle red"></i>
                                  </a>
                                </h4>
                              </div>
                              <div class="fareColumn-main">
                                <p>
                                  <i class="fa fa-check-circle green pr-5"></i>{" "}
                                  <span data-bind="i18n-text: { key: 'TextField-OB-200.allowedwithoutcharge' + $parents[2].routeTypeSuffix}">
                                    Allowed
                                  </span>
                                </p>

                                <p>
                                  <i class="fa fa-check-circle green pr-5"></i>{" "}
                                  <span data-bind="i18n-text: { key: 'TextField-OB-201.allowedwithoutcharge'}">
                                    Allowed
                                  </span>{" "}
                                  -{" "}
                                  <span data-bind="i18n-text: { key: 'TextField-OB-201.state', args: { 'hour': timeAmount } }">
                                    Within 12 hour(s) to the flight
                                  </span>{" "}
                                </p>

                                <p class="red">
                                  <i class="fa fa-times-circle red pr-5"></i>{" "}
                                  <span data-bind="i18n-text: { key: 'TextField-OB-201.notallowed'}">
                                    Not allowed
                                  </span>{" "}
                                  -{" "}
                                  <span data-bind="i18n-text: { key: 'TextField-OB-201.state', args: { 'hour': timeAmount } }">
                                    Within 1 hour(s) to the flight
                                  </span>
                                </p>

                                <p class="red">
                                  <i class="fa fa-times-circle red pr-5"></i>{" "}
                                  <span data-bind="i18n-text: { key: 'TextField-OB-202.notallowed'}">
                                    Not allowed
                                  </span>{" "}
                                  -{" "}
                                  <span data-bind="i18n-text: { key: 'TextField-OB-202.state'}">
                                    (In case of no-show)
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            class="col-xs-12 fareColumn col-sm-3"
                            data-bind="css : ((($data.awardMilesRule &amp;&amp; ($data.awardMilesRule.STATUS || $data.awardMilesRule.BONUS || $data.awardMilesRule.TOTAL)) || $data.awardMileRules) ? 'col-sm-3' : 'col-sm-4')">
                            <div class="fareColumn-wrapper">
                              <div class="fareColumn-header">
                                <h4 class="fs-14 fw700">
                                  <span
                                    class="pr-5"
                                    data-bind="i18n-text: { key: 'Label-OB-171'} ">
                                    REFUND / CANCELLATION
                                  </span>

                                  <a
                                    class="no-border absolute"
                                    data-placement="bottom"
                                    data-toggle="tooltip"
                                    data-bind="attr:{'title':i18n.get('Tooltip-OB-08')}"
                                    title=""
                                    data-original-title="Penalty charges shown in the refund/cancellation rules section apply to each adult passenger individually. For domestic flights, refund conditions for each flight are calculated independently. For international flights, refund penalties may vary according to your other flights. In this situation, restricted fare rules are valid. Penalty charges may vary according to currency fluctuations for which Turkish Airlines is not responsible. Ticket service fees cannot be refunded under any circumstance. If you would like to claim a refund for a flight you did not board, the terms and conditions specified for a no-show will apply.">
                                    <i class="fa fa-info-circle red"></i>
                                  </a>
                                </h4>
                              </div>
                              <div class="fareColumn-main">
                                <p>
                                  <i class="fa fa-check-circle green pr-5"></i>{" "}
                                  <span data-bind="i18n-text: { key: 'TextField-OB-203.allowedwithoutpenalty'+ $parents[2].routeTypeSuffix}">
                                    Full refund
                                  </span>
                                </p>

                                <p>
                                  <i class="fa custom-price-icon fa-try pr-5"></i>{" "}
                                  <span data-bind="i18n-text: { key: 'TextField-OB-204.allowedwithpenalty' , args : {'fee' : $parents[2].getPriceWithDigit(penalty.amount, 'NEVER', penalty.currency, $root.roundingMode) + ' ' + penalty.currency } }">
                                    With 200,00 TRY deduction
                                  </span>{" "}
                                  -{" "}
                                  <span data-bind="i18n-text: { key: 'TextField-OB-204.state', args: { 'hour': timeAmount } }">
                                    Within 12 hour(s) to the flight
                                  </span>
                                </p>

                                <p class="red">
                                  <i class="fa fa-times-circle red pr-5"></i>{" "}
                                  <span data-bind="i18n-text: { key: 'TextField-OB-204.allowedfortaxes'}">
                                    Not allowed
                                  </span>{" "}
                                  -{" "}
                                  <span data-bind="i18n-text: { key: 'TextField-OB-204.state', args: { 'hour': timeAmount } }">
                                    Within 1 hour(s) to the flight
                                  </span>
                                </p>

                                <p class="red">
                                  <i class="fa fa-times-circle red pr-5"></i>{" "}
                                  <span data-bind="i18n-text: { key: 'TextField-OB-205.allowedfortaxes'}">
                                    Not allowed
                                  </span>{" "}
                                  -{" "}
                                  <span data-bind="i18n-text: { key: 'TextField-OB-205.state'}">
                                    (In case of no-show)
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            class="col-xs-12 fareColumn col-sm-3"
                            data-bind="css : ((($data.awardMilesRule &amp;&amp; ($data.awardMilesRule.STATUS || $data.awardMilesRule.BONUS || $data.awardMilesRule.TOTAL)) || $data.awardMileRules) ? 'col-sm-3' : 'col-sm-4')">
                            <div class="fareColumn-wrapper">
                              <div class="fareColumn-header">
                                <h4 class="fs-14 fw700">
                                  <span
                                    class="pr-5"
                                    data-bind="i18n-text: { key: 'Label-OB-172'} ">
                                    BAGGAGE ALLOWANCE
                                  </span>

                                  <a
                                    class="no-border absolute"
                                    data-placement="bottom"
                                    data-toggle="tooltip"
                                    data-bind="attr:{'title':i18n.get('Tooltip-OB-09')}"
                                    title=""
                                    data-original-title="Information shown in the baggage allowance section is valid for adult passengers; baggage allowances may vary for other passengers. You can view the baggage allowance for each individual passenger when you are purchasing your ticket. This information does not include cabin baggage. You can find more detailed information about cabin baggage on our cabin baggage page.">
                                    <i class="fa fa-info-circle red"></i>
                                  </a>
                                </h4>
                              </div>
                              <div class="fareColumn-main">
                                <p>
                                  <i class="fa fa-check-circle green pr-5"></i>

                                  <span data-bind="i18n-text: { key: 'TextField-OB-178.piecekg' , args : {'piece' : count , 'kg' : kiloPerPiece.weight, 'countP' : 'piece'} }">
                                    Check-in Baggage : 1 piece x 30 kg
                                  </span>
                                </p>

                                <p>
                                  <i class="fa fa-check-circle green pr-5"></i>
                                  <span data-bind="i18n-text: { key: 'TextField-OB-184.piecekg', args : {'piece' : count, 'kg' : kiloPerPiece.weight, 'countP' : 'piece'}}">
                                    Cabin Baggage : 2 pieces x 8 kg
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12 col-sm-3 fareColumn">
                            <div class="fareColumn-wrapper">
                              <div class="fareColumn-header">
                                <h4 class="fs-14 fw700">
                                  <span
                                    class="pr-5"
                                    data-bind="i18n-text: { key: 'Label-OB-173'} ">
                                    MILES TO BE EARNED FOR
                                    MILES&amp;SMILES MEMBERS
                                  </span>
                                  <a
                                    class="no-border absolute"
                                    data-placement="bottom"
                                    data-toggle="tooltip"
                                    data-bind="attr:{'title':i18n.get('Tooltip-OB-10')}"
                                    title=""
                                    data-original-title="The amount of Miles earned may vary according to your frequent flyer program and your membership level. The information here is calculated according to the card level of the Miles&amp;Smiles member who has signed in to their account. It is entirely the responsibility of the passenger to monitor the processing of Miles after the flight.">
                                    <i class="fa fa-info-circle red"></i>
                                  </a>
                                </h4>
                              </div>
                              <div class="fareColumn-main">
                                <p>
                                  <i class="fa fa-check-circle green pr-5"></i>

                                  <span data-bind="i18n-text: { key: 'TextField-OB-169.status.mil', args : {'mile' : amount}}">
                                    1000 Status Miles
                                  </span>
                                </p>

                                <p>
                                  <i class="fa fa-check-circle green pr-5"></i>

                                  <span data-bind="i18n-text: { key: 'TextField-OB-169.bonus.mil', args : {'mile' : amount}}">
                                    1000 Bonus Miles
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12 col-sm-3 fareColumn">
                            <div class="fareColumn-wrapper">
                              <div class="fareColumn-header">
                                <h4 class="fs-14 fw700">
                                  <span
                                    class="pr-5"
                                    data-bind="i18n-text: { key: 'FareNotes.Seat.Title'} ">
                                    Seat selection allowance
                                  </span>
                                  <a
                                    class="no-border absolute"
                                    data-placement="bottom"
                                    data-toggle="tooltip"
                                    data-bind="attr:{'title':i18n.get('FareNotes.Seat.Tooltip')}"
                                    title=""
                                    data-original-title="Free seat selection">
                                    <i class="fa fa-info-circle red"></i>
                                  </a>
                                </h4>
                              </div>
                              <div class="fareColumn-main">
                                <p>
                                  <i
                                    class="fa fa-check-circle green"
                                    data-bind="css: (hasRight ? (withCharge ? ('custom-price-icon fa-try') : ('fa-check-circle green')) : ('fa-times-circle red') )"></i>
                                  <span data-bind="i18n-text: { key: $component.keyPrefix + key, args: args }">
                                    Standard seat selection
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12 col-sm-3 fareColumn">
                            <div class="fareColumn-wrapper">
                              <div class="fareColumn-header">
                                <h4 class="fs-14 fw700">
                                  <span
                                    class="pr-5"
                                    data-bind="i18n-text: { key: 'FareNotes.Meal.Title'} ">
                                    Dining experience
                                  </span>
                                  <a
                                    class="no-border absolute"
                                    data-placement="bottom"
                                    data-toggle="tooltip"
                                    data-bind="attr:{'title':i18n.get('FareNotes.Meal.Tooltip')}"
                                    title=""
                                    data-original-title="Dining on board">
                                    <i class="fa fa-info-circle red"></i>
                                  </a>
                                </h4>
                              </div>
                              <div class="fareColumn-main">
                                <p>
                                  <i
                                    class="fa fa-check-circle green"
                                    data-bind="css: (hasRight ? (withCharge ? ('custom-price-icon fa-try') : ('fa-check-circle green')) : ('fa-times-circle red') )"></i>
                                  <span data-bind="i18n-text: { key: $component.keyPrefix + key, args: args }">
                                    Special meal
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12 col-sm-3 fareColumn">
                            <div class="fareColumn-wrapper">
                              <div class="fareColumn-header">
                                <h4 class="fs-14 fw700">
                                  <span
                                    class="pr-5"
                                    data-bind="i18n-text: { key: 'FareNotes.Others.Title'} ">
                                    Other advantages
                                  </span>
                                  <a
                                    class="no-border absolute"
                                    data-placement="bottom"
                                    data-toggle="tooltip"
                                    data-bind="attr:{'title':i18n.get('FareNotes.Others.Tooltip')}"
                                    title=""
                                    data-original-title="The allowances of frequent flyer passengers">
                                    <i class="fa fa-info-circle red"></i>
                                  </a>
                                </h4>
                              </div>
                              <div class="fareColumn-main">
                                <p>
                                  <i
                                    class="fa fa-check-circle green"
                                    data-bind="css: (hasRight ? (withCharge ? ('custom-price-icon fa-try') : ('fa-check-circle green')) : ('fa-times-circle red') )"></i>
                                  <span data-bind="i18n-text: { key: $component.keyPrefix + key, args: args }">
                                    Business Lounge
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-xs-12">
                          <div class="fare-rule-info icon-text-partial free">
                            <div class="elem-icon small-icon">
                              <i class="fa fa-info-circle fs-20  "></i>
                            </div>
                            <div class="elem-text fw500">
                              <span data-bind="i18n-text: { key: 'FareRules.Warning.AdditionalChargesShouldBePaid'}">
                                *When making changes to your ticket,
                                you must pay the fee difference as
                                well as any additional price
                                differences that may occur.
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </farerules>
                </div>
              </div>
            </div>
            <div class="col-xs-12">
              <div class="row grid-top without-canvas mb-20">
                <div class="col-sm-12">
                  <div
                    class="canvas-table-wrapper selected-flight-bar domestic without-icon"
                    data-bind="selected-item-flight-international : { flightIndex: $index(), flight: selectedFlight, links: $root.pageLinks }">
                    <div
                      class="flight-line"
                      data-bind="flightIndex: flightIndex, dateFormat: dateFormat, click: showHideDetail">
                      <div class="flight-col">
                        <div
                          class="flight-canvas"
                          data-bind="css: (isDayChanged() ? 'day-changed-wrapper' : '')">
                          <div class="airline-image">
                            <span class="img-wrapper">
                              <img
                                data-bind="attr:{src: '/theme/img/carrierairlines/carriercode_' + airline.shortName.toLocaleLowerCase() + '.png'}"
                                src="/theme/img/carrierairlines/carriercode_tk.png"
                              />
                            </span>

                            <div
                              class="direct-flight-text"
                              data-bind="i18n-text: { key: 'Label-OB-80'}">
                              Direct
                            </div>
                          </div>

                          <div
                            class="port-segment single-flight"
                            data-bind="css:(($parent.flight.segments.length > 1) ? ((segment.spa || segment.codeShare) ? 'codeshare' : '') : ((segment.spa || segment.codeShare) ? 'codeshare single-flight' : 'single-flight'))">
                            <div
                              class="flight-segment origin"
                              data-bind="css:( ($parent.flight.segments.length > 1) ? 'multi' : '')">
                              <div
                                class="time"
                                data-bind="moment:{value : departureDateTime, timeZoneRawOffset : departureDateTimeTimeZoneRawOffset , pattern : 'HH:mm'}">
                                02:00
                              </div>
                              <div
                                class="port"
                                data-bind="i18n-text: {key: 'portcodelookup.' + segment.originAirport.code}">
                                IST
                              </div>

                              <div
                                class="name"
                                data-bind="i18n-text: {key: 'portcitylookup.' + segment.originAirport.code}">
                                Istanbul
                              </div>
                            </div>

                            <div
                              class="flight-segment destination"
                              data-bind="css:( ($parent.flight.segments.length > 1) ? 'multi' : '')">
                              <div
                                class="time"
                                data-bind="moment:{value : arrivalDateTime, timeZoneRawOffset : arrivalDateTimeTimeZoneRawOffset , pattern : 'HH:mm'}">
                                03:15
                              </div>

                              <div
                                class="port"
                                data-bind="i18n-text: {key: 'portcodelookup.' + segment.destinationAirport.code}">
                                ESB
                              </div>

                              <div
                                class="name"
                                data-bind="i18n-text: {key: 'portcitylookup.' + segment.destinationAirport.code}">
                                Ankara
                              </div>
                            </div>
                            <div
                              class="day-changed"
                              data-bind="visible: $parent.isDayChanged(), text: $parent.isDayChanged()"
                              style={{ display: "none" }}></div>
                          </div>
                        </div>

                        <div class="flight-duration">
                          <div
                            class="bold color-99a1ae"
                            data-bind="i18n-text: { key: 'Label-OB-81'}">
                            Flight Duration
                          </div>
                          <div
                            class="fs-14 fw700 ws-nowrap color-232b38"
                            data-bind="humanize:{ value : flight.totalTravelDurationISO, delimiter : ''}">
                            1h 15m
                          </div>
                        </div>

                        <div class="flight-cabin-class-type">
                          <span data-bind="css: (!cabinClassObj().detail.brandCode &amp;&amp; cabinClassObj().detail.classList.length) ? 'right-add-comma' : '', text: cabinClassObj().type">
                            BUSINESS
                          </span>
                          <span
                            data-bind="css: cabinClassObj().detail.brandCode ? 'right-add-comma' : '', text: cabinClassObj().detail.brandCode"
                            class="right-add-comma">
                            Business
                          </span>
                          <span data-bind="text: cabinClassObj().detail.classList.join('-')">
                            J
                          </span>
                        </div>
                      </div>
                      <div class="itinary-segment">
                        <a
                          role="button"
                          tabindex="0"
                          class="itinerary-details-btn">
                          <span data-bind="i18n-text: { key: 'Link-OB-14'}">
                            Itinerary details
                          </span>
                          <i class="fa fa-chevron-up ml-5" />
                          <i class="fa fa-chevron-down ml-5" />
                        </a>
                      </div>
                    </div>

                    <div
                      class="layover-tooltip"
                      data-bind='component: { name: "layover-tooltip", params: { segments:flight.segments, idPrefix:"fTooltip_" + flightIndex + $index()}}'></div>
                  </div>
                  <div
                    class="flight-detail"
                    data-bind="flight-detail: { panel: $parent.bookingSelectionHolder(), flight: selectedFlight, showDetails: true, isAwardTicket: $parent.isAwardTicket, selectedFlight: true, links: $root.pageLinks }">
                    <div
                      class="detail-wrapper"
                      data-bind="visible: (isAwardTicket || notBrandedFlight) ? showDetails : true">
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="table table-bordered accordion-table table-gray online-booking-table mb-0">
                        <thead>
                          <tr>
                            <th data-bind="i18n-text: { key: 'Label-OB-94'}">
                              FLIGHT
                            </th>
                            <th data-bind="i18n-text: { key: 'Label-OB-95'}">
                              FROM
                            </th>
                            <th data-bind="i18n-text: { key: 'Label-OB-96'}">
                              TO
                            </th>
                            <th data-bind="i18n-text: { key: 'Label-OB-97'}">
                              DURATION
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr
                            class="showcanvasoverlay"
                            data-bind="attr: { 'data-target': '.f_' + $parent.flight.id + '_' + $index() }"
                            data-target=".f_0_0">
                            <td>
                              <div class="clearfix">
                                <div class="pull-left">
                                  <h4 class="fs-16 fw700">
                                    <img
                                      data-bind="attr:{src: '/theme/img/carrierairlines/carriercode_' + carrierAirline.shortName.toLocaleLowerCase() + '.png'}"
                                      src="/theme/img/carrierairlines/carriercode_tk.png"
                                    />

                                    <span data-bind="text : flightNumber">
                                      TK2192
                                    </span>
                                  </h4>
                                </div>
                                <div class="pull-right text-right mt-10"></div>
                              </div>
                              <div>
                                <h5 class="text-muted fs-14 fw700 nomargin">
                                  <span data-bind="i18n-text: { key: 'TextField-OB-67' , args:{'carriercodelookup': carrierAirline.shortName}}">
                                    Turkish Airlines
                                  </span>
                                  <span
                                    data-bind="visible:(!carrierAirline.shortName), text: carrierAirline.longName"
                                    style={{
                                      display: "none",
                                    }}></span>
                                </h5>

                                <small class="blue fs-11">
                                  <span
                                    class="blue"
                                    data-bind="i18n-text: { key: 'TextField-OB-68' , args:{ 'planemodellookup': $data.equipment.airEquipType} }">
                                    Airbus A320
                                  </span>
                                  <span
                                    class="gray"
                                    data-bind="i18n-text: { key: 'TextField-OB-13000' , args:{ 'planetypelookup': $data.equipment.airEquipType } }">
                                    Narrow-body
                                  </span>
                                </small>
                              </div>
                            </td>
                            <td>
                              <h4
                                class="blue fs-16 fw700 mb-5"
                                data-bind="moment:{value : departureDateTime, timeZoneRawOffset : departureDateTimeTimeZoneRawOffset, pattern : 'HH:mm'}">
                                02:00
                              </h4>
                              <h6
                                class="red mb-5 mt-5"
                                data-bind="moment:{value : departureDateTime, timeZoneRawOffset : departureDateTimeTimeZoneRawOffset, pattern : $root.dateFormat().fulldayfullmonth}, date-visible-if-futurelocalday : {referenceDate: $parent.flight.firstSegment.departureDateTime, referenceTimeZoneRawOffset : $parent.flight.firstSegment.departureDateTimeTimeZoneRawOffset, date: departureDateTime, timeZoneRawOffset: departureDateTimeTimeZoneRawOffset}"
                                style={{ display: "none" }}>
                                Saturday, June 27
                              </h6>

                              <div class="fs-14 fw700 mt-5">
                                <div data-bind="i18n-text: { key: 'TextField-OB-85', args:{'portcitylookup': originAirport.code, 'countrylookup' : originAirport.country.code, 'portcodelookup' : originAirport.code}}">
                                  Istanbul (IST)
                                </div>
                                <div
                                  class="text-muted fs-12 fw500"
                                  data-bind="i18n-text: { key: 'TextField-OB-87' , args:{'portnamelookup':originAirport.code}}">
                                  Istanbul Airport
                                </div>
                              </div>
                            </td>
                            <td>
                              <h4
                                class="blue fs-16 fw700 mb-5"
                                data-bind="moment:{value : arrivalDateTime, timeZoneRawOffset : arrivalDateTimeTimeZoneRawOffset, pattern : 'HH:mm'}">
                                03:15
                              </h4>
                              <h6
                                class="red mb-5 mt-5"
                                data-bind="moment:{value : arrivalDateTime, timeZoneRawOffset : arrivalDateTimeTimeZoneRawOffset, pattern : $root.dateFormat().fulldayfullmonth}, date-visible-if-futurelocalday : {referenceDate: $parent.flight.firstSegment.departureDateTime, referenceTimeZoneRawOffset : $parent.flight.firstSegment.departureDateTimeTimeZoneRawOffset, date: arrivalDateTime, timeZoneRawOffset: arrivalDateTimeTimeZoneRawOffset}"
                                style={{ display: "none" }}>
                                Saturday, June 27
                              </h6>

                              <div class="fs-14 fw700 mt-5">
                                <div data-bind="i18n-text: { key: 'TextField-OB-85', args:{'portcitylookup': destinationAirport.code, 'countrylookup' : destinationAirport.country.code, 'portcodelookup' : destinationAirport.code}}">
                                  Ankara (ESB)
                                </div>
                                <div
                                  class="text-muted fs-12 fw500"
                                  data-bind="i18n-text: { key: 'TextField-OB-87' , args:{'portnamelookup':destinationAirport.code}}">
                                  Ankara Esenboga Airport
                                </div>
                              </div>
                            </td>
                            <td></td>
                            <h4
                              class="fs-16 fw900 ws-nowrap"
                              data-bind="humanize : {value : journeyDuration, delimiter: '' }">
                              1h 15m
                            </h4>

                            <div class="text-center">
                              <a
                                target="_blank"
                                data-bind="i18n-attr:{'key':'Tooltip-OB-14', 'attr':'title'}, attr: {href: $parent.links.miniPortIstanbulLink}"
                                data-toggle="tooltip"
                                title=""
                                href="https://miniport.istanbul/en"
                                data-original-title="With Miniport, your baggage won’t tie you down.">
                                <img
                                  src="/theme/img/miniPort.png"
                                  class="pull-left miniPortIstanbulLogo"
                                  alt="Mini Port istanbul"
                                />
                              </a>
                            </div>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <hr></hr>
              <hr></hr>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
