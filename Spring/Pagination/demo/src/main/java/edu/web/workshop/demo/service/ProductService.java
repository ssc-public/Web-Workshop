package edu.web.workshop.demo.service;

import edu.web.workshop.demo.entity.Product;
import edu.web.workshop.demo.repository.ProductRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Page<Product> getProducts(int pageNum, int pageSize) {
        Pageable pageRequest = PageRequest.of(pageNum, pageSize);
        return productRepository.findAll(pageRequest);
    }

    public void createProduct(Product product) {
        productRepository.save(product);
    }

    @PostConstruct
    public void createProductEntities() {
        for (int i = 0; i < 10; i++) {
            Product product = new Product();
            product.setId(i);
            product.setName("p_" + i);
            product.setPrice(ThreadLocalRandom.current().nextDouble());
            createProduct(product);
        }
    }
}
