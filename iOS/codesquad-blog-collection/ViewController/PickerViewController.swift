//
//  PickerViewController.swift
//  codesquad-blog-collection
//
//  Created by joon-ho kil on 2020/01/01.
//  Copyright © 2020 길준호. All rights reserved.
//

import UIKit

class PickerViewController: UIViewController, UIPickerViewDelegate, UIPickerViewDataSource {
    var superView: PopupViewController!
    lazy var pickerView: UIPickerView = {
        // Generate UIPickerView.
        let picker = UIPickerView()
        // Specify the size.
        picker.frame = CGRect(x: 0, y: 150, width: self.view.bounds.width, height: 180.0)
        // Set the backgroundColor.
        picker.backgroundColor = .white // Set the delegate.
        picker.delegate = self // Set the dataSource.
        picker.dataSource = self
        return picker
    }()
    private let values: [String] = ["Back-End","Front-End","iOS","swift"]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        view.addSubview(self.pickerView)
        superView.categoryTextField.text = "Back-End"
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
        
    }
    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
        
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return values.count
        
    } // Delegate method that returns the value to be displayed in the picker.
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return values[row]
    } // A method called when the picker is selected.
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        superView.categoryTextField.text = values[row]
    }
    
    @IBAction func close(_ sender: Any) {
        dismiss(animated: true, completion: nil)
    }
}
