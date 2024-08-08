package edu.web.workshop.demo.controller;

import edu.web.workshop.demo.entity.Product;
import edu.web.workshop.demo.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("")
    public Page<Product> getProducts(@RequestParam int pageNum, @RequestParam int pageSize) {
        return productService.getProducts(pageNum, pageSize);
    }
}
