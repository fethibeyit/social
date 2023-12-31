package com.fethibey.social.security.jwt;

import com.fethibey.social.security.config.AppProperties;
import com.fethibey.social.security.model.LocalUser;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TokenProvider {

	@Autowired
	private JwtEncoder jwtEncoder;

	@Autowired
	private JwtDecoder jwtDecoder;

	private static final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

	private AppProperties appProperties;

	public TokenProvider(AppProperties appProperties) {
		this.appProperties = appProperties;
	}

	public String createToken(Authentication authentication) {
		LocalUser userPrincipal = (LocalUser) authentication.getPrincipal();

		Instant now=Instant.now();
		String scope= authentication.getAuthorities()
				.stream().map(auth->auth.getAuthority())
				.collect(Collectors.joining(" "));
		JwtClaimsSet jwtClaimsSet=JwtClaimsSet.builder()
				.issuedAt(now)
				.subject(userPrincipal.getUser().getId().toString())
				.expiresAt(now.plus(5, ChronoUnit.MINUTES))
				.claim("scope",scope)
				.build();
		JwtEncoderParameters jwtEncoderParameters=
				JwtEncoderParameters.from(
						JwsHeader.with(MacAlgorithm.HS512).build(),
						jwtClaimsSet
				);
		Jwt jwt = jwtEncoder.encode(jwtEncoderParameters);

		return jwt.getTokenValue();
	}

	public UUID getUserIdFromToken(String token) {
		var jwt = jwtDecoder.decode(token);
		return UUID.fromString(jwt.getSubject());
	}

	public boolean validateToken(String authToken) {

		try {
			jwtDecoder.decode(authToken);
			return true;

		} catch (JwtException ex) {
			logger.error("Invalid JWT");

		} catch (SignatureException ex) {
			logger.error("Invalid JWT signature");
		} catch (MalformedJwtException ex) {
			logger.error("Invalid JWT token");
		} catch (ExpiredJwtException ex) {
			logger.error("Expired JWT token");
		} catch (UnsupportedJwtException ex) {
			logger.error("Unsupported JWT token");
		} catch (IllegalArgumentException ex) {
			logger.error("JWT claims string is empty.");
		}
		return false;
	}
}