//
//  codesquad_blog_collectionUITests.swift
//  codesquad-blog-collectionUITests
//
//  Created by joon-ho kil on 9/16/19.
//  Copyright © 2019 길준호. All rights reserved.
//

import XCTest

class codesquad_blog_collectionUITests: XCTestCase {
    let app = XCUIApplication()
    
    override func setUp() {
        // Put setup code here. This method is called before the invocation of each test method in the class.

        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false

        app.launch()
        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }

    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testExample() {
        // UI tests must launch the application that they test.
        
        app.buttons["FloatButton"].tap()
        XCTAssert(app.otherElements["PopupView"].exists)
        let coordinate = app.coordinate(withNormalizedOffset: CGVector(dx: 10, dy: 10))
        coordinate.tap()
        XCTAssert(!app.otherElements["PopupView"].exists)

        // Use recording to get started writing UI tests.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
    }

    func testLaunchPerformance() {
        if #available(macOS 10.15, iOS 13.0, tvOS 13.0, *) {
            // This measures how long it takes to launch your application.
            measure(metrics: [XCTOSSignpostMetric.applicationLaunch]) {
                XCUIApplication().launch()
            }
        }
    }
}
